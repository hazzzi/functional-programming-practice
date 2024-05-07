# 액션에서 계산 빼내기

- 액션에서 어떤 부분이 계산인지 인지하고 추출하여 리팩터링한다
- 새 함수에 암묵적 입력과 출력을 찾자
  - 입력: 인자를 포함하여, 함수 밖의 변수를 읽거나 데이터베이스에서 값을 가져오거나
  - 출력: 리턴을 포함하여, 전역 변수를 바꾸거나 공유 객체를 바꾸거나 웹 요청을 보내는 것
- 암묵적 입력은 인자로 바꾸기
- 암묵적 출력은 리턴값으로 바꾸기

## 연습 문제 1
```javascript
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.10);
}
```
1. 계산인 부분
shopping_cart_total에 0.10 을 곱하는 부분은 계산으로 빼낼 수 있다

```
function calc_tax() {
  return shopping_cart_total * 0.10
}
// shopping_cart_total은 전역 변수, 암묵적으로 읽고 있기 때문에 인자로 변경

function calc_tax(amount) {
  return amount * 0.10
}

function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}
```

## 연습 문제 2
```javascript
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(item.price + shopping_cart_total >= 20)
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
  }
}
```
1. 계산 추출하기
아이템 가격을 장바구니 가격과 더한 값이 20 보다 크다는 계산.

```javascript
function calc_free_shipping(item_price) {
  return item_price + shopping_cart_total >= 20
}
```
shopping_cart_total이라는 값은 전역변수를 암묵적으로 읽고 있음.

**to-be**
```javascript
function calc_free_shipping(item_price, cart_total) {
  return item_price + cart_total >= 20
}

function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(calc_free_shipping(item.price, shopping_cart_total)
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
  }
}
```
