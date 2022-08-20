---
title: "Parsing JSON Request Body in Go Fiber"
date: 2022-08-20T12:44:55+06:00
categories: [go]
tags: [fiber-framework, http-request]
---

![Request-Response](/request-response.png#feat)
When the default body parser of the Fiber framework fails to parse a JSON request body, it returns an error message which is not very human-readable and client-side-friendly.

Say for example, you expect a json field named `post_id` in the request body of your API endpoint and you expect its value to be an integer, but nothing is stopping the API-consumer from sending an unacceptable type of value in the `post_id` field:

```json
{ "post_id": 1 } // Expected
```

```json
{ "post_id": "asdf" } // Unexpected
```

Typically, request body comes in the raw form (bytes/strings etc.). It's the controller/handler's job to parse the body and associate the key-value pairs to the most appropriate data structure at our disposal. In case of Go, the Struct data structure is commonly used for parsing. If you have a `/comments` endpoint and you are expecting a JSON request body like this:

```json
{
  "post_id": 1,
  "comment": "Lorem ipsum dolor sit amet"
} // Expected
```

You'd want to parse this body into a struct like this:

```go
// Somewhere in your comment_handler.go:
// ...
type Comment struct {
  PostID int `json:"post_id"`,
  Comment string `json:"comment"`
}
// ...
body := new(Comment)
if err := c.BodyParser(body); err != nil {
  return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
    "errors": err.Error(),
  })
}
```

Now if you hit your `/comments` endpoint with this payload:

```json
{
  "post_id": "asdf",
  "comment": "Lorem ipsum dolor sit amet"
} // Unexpected
```

...you will get a response like the following which is not very human-readable:

```json
{
  "errors": "json: cannot unmarshal string into Go struct field Comment.post_id of type int"
}
```

The error messages for malformed JSON are also cryptic. Also, I haven't found a fiber configuration to disallow unknown fields (fields that are not present in the struct, but sent via request body).

So I have been looking for a way to properly detect these edge cases and [this article by Alex Edwards](https://www.alexedwards.net/blog/how-to-properly-parse-a-json-request-body) comes to the rescue!

The article was written with standard library in mind, so I had to tweak it a bit to incorporate that in a fiber project. In your fiber project, you probably have a `utils` or `helpers` package. Create a file called `decode_json.go` under that package:

```go
package utils

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type MalformedRequest struct {
	Status int
	Msg    string
}

func (mr *MalformedRequest) Error() string {
	return mr.Msg
}

func DecodeJSONBody(c *fiber.Ctx, dst interface{}) error {
	if c.Get("Content-Type") != "application/json" {
		msg := "Content-Type header is not application/json"
		return &MalformedRequest{Status: http.StatusUnsupportedMediaType, Msg: msg}
	}

	dec := json.NewDecoder(bytes.NewReader(c.Body()))
	dec.DisallowUnknownFields()

	err := dec.Decode(&dst)
	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError

		switch {
		case errors.As(err, &syntaxError):
			msg := fmt.Sprintf(
				"Request body contains badly-formed JSON (at position %d)",
				syntaxError.Offset,
			)
			return &MalformedRequest{Status: http.StatusBadRequest, Msg: msg}

		case errors.Is(err, io.ErrUnexpectedEOF):
			return &MalformedRequest{
				Status: http.StatusBadRequest,
				Msg:    "Request body contains badly-formed JSON",
			}

		case errors.As(err, &unmarshalTypeError):
			msg := fmt.Sprintf(
				"Request body contains an invalid value for the %q field (at position %d)",
				unmarshalTypeError.Field,
				unmarshalTypeError.Offset,
			)
			return &MalformedRequest{Status: http.StatusBadRequest, Msg: msg}

		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			return &MalformedRequest{Status: http.StatusBadRequest, Msg: msg}

		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return &MalformedRequest{Status: http.StatusBadRequest, Msg: msg}

		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			return &MalformedRequest{Status: http.StatusRequestEntityTooLarge, Msg: msg}

		default:
			return err
		}
	}

	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		msg := "Request body must only contain a single JSON object"
		return &MalformedRequest{Status: http.StatusBadRequest, Msg: msg}
	}

	return nil
}
```

As you can see, the `decodeJSONBody()` helper covers the following scenarios:

- Badly formed JSON
- Invalid value
- Empty request body
- Unknown field

Finally, from within your handler you can just parse the request body like this:

```go
var mr *utils.MalformedRequest
err := utils.DecodeJSONBody(c, body)
if err != nil {
  if errors.As(err, &mr) {
    return c.Status(mr.Status).JSON(fiber.Map{
      "message": mr.Msg,
    })
  } else {
    log.Print(err.Error())
    return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
      "message": "Internal Server Error",
    })
  }
}
```
