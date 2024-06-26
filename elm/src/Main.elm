module Main exposing (..)

import Browser
import Html exposing (Html, div, text, button)
import Html.Events exposing (onClick)

-- MAIN
main =
  Browser.sandbox { init = 0, update = update, view = view }

-- MODEL
type alias Model = Int

init: Model
init = 
  0

type Msg = Increment | Decrement

update: Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

-- VIEW
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement] [ text "-"]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment] [ text "+"] 
    ]