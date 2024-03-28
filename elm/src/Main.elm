module Main exposing (..)

import Browser
import Html exposing (Html, div, text, button)
import Html.Events exposing (onClick)

main =
  Browser.sandbox { init = 0, update = update, view = view }

type alias Model = Int

type Msg
  = Increment
  | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement] [ text "-"]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment] [ text "+"] 
    ]