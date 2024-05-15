module Form exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Char exposing (isUpper)
import Char exposing (isDigit)

-- MAIN
main = Browser.sandbox { init = init, update = update, view = view}

-- MODEL
type alias Model =
    { name : String
    , password : String
    , passwordAgain: String
    }

init: Model
init = 
  Model "" "" ""

-- UPDATE
type Msg
    = Name String
    | Password String
    | PasswordAgain String

update : Msg -> Model -> Model
update msg model = 
  case msg of
    Name name -> 
      { model | name = name }

    Password password ->
      { model | password = password }

    PasswordAgain passwordAgain ->
      { model | passwordAgain = passwordAgain }

-- VIEW

view : Model -> Html Msg
view model = 
  div []
    [ viewInput "text" "Name" model.name Name
    , viewInput "password" "Password" model.password Password
    , viewInput "password" "Re-enter Password" model.passwordAgain PasswordAgain
    , viewValidationAgain model
    , viewValidationLength model
    , viewValidationFormat model
    ]

viewInput : String -> String -> String -> (String -> msg) -> Html msg
viewInput t p v toMsg = 
  input [ type_ t, placeholder p, value v, onInput toMsg ][]

viewValidationAgain : Model -> Html msg
viewValidationAgain model = 
  if model.password == model.passwordAgain then
    div [ style "color" "green" ] [text "OK"]
  else
    div [ style "color" "red" ][text "비밀번호가 일치하지 않습니다."]

viewValidationLength : Model -> Html msg
viewValidationLength model = 
  if String.length model.password > 8 then
    div [ style "color" "green" ] [text "OK"]
  else
    div [ style "color" "red" ] [text "비밀번호는 8글자 이상이어야 합니다."]

viewValidationFormat : Model -> Html msg
viewValidationFormat model =
  if String.all Char.isAlphaNum model.password then
    div [ style "color" "green" ] [text "OK"]
  else
    div [ style "color" "red" ] [text "password contains upper case, lower case, and numeric characters"]