# 더 좋은 액션 만들기

## 비즈니스 요구사항과 설계를 맞추기
- 기계적으로 액션에서 계산으로 리팩터링하는 것이 항상 최선의 구조를 만들지는 않음

```javascript
// as-is
function gets_free_shipping(total, item_price) {
  return item_price + total >= 20;
}
```
비즈니스 요구사항으로 봤을 때는 맞지 않은 부분이 존재함.  
요구사항은 "장바구니에 담긴 제품을 주문할 때 무료배송인지 확인하는 것"   
구현된 함수에서는 장바구니로 무료배송을 확인하지 않고, 제품의 합계와 제품의 가격으로 확인   
-> 여기서 불일치 발생함

## 비즈니스 요구 사항과 함수를 맞추기

```javascript
// to-be
function gets_free_shipping(cart) {
  return calc_total(cart) >= 20
}
```
함수의 동작을 바꿨기 때문에 엄밀히 말하면 리팩터링이라고 할 수 없음.

```javascript
// as-is
function update_shipping_icons() {
  // ...
  for(var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var item = button.item;

    if(gets_free_shipping(shopping_cart_total, item.price)) {
      //...
    }
  }
}

// to-be
function update_shipping_icons() {
  // ...
  for(var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var item = button.item;
    var new_cart = add_item(shopping_cart, item.name, item.price);

    if(gets_free_shipping(new_cart)) {
      //...
    }
  }
}
```

**생각해보기**  
원래 있던 장바구니를 직접 변경하지 않고 복사본을 만들었음. 이러한 스타일을 함수형 프로그래밍에서 뭐라고 부르지..?

add_item()을 부를때마다 cart 배열을 복사하는 비용은?  
-> 최신 프로그래밍 언어의 런타임과 가비지 컬렉터는 불필요한 메모리를 잘 처리하고있음

## 원칙: 암묵적 입력과 출력은 적을수록 좋습니다.
- 인자가 아닌 모든 입력은 암묵적 입력
- 리턴이 아닌 모든 출력은 암묵적 출력

어떤 함수에 암묵적 입력과 출력이 있다면 다른 컴포넌트와 강하게 연결된 컴포넌트라고 할 수 있음  
명시적인 입출력은 모듈의 커넥터와 같다  

암묵적인 입출력이 있는 함수는 아무 때나 실행할 수 없기 떄문에 테스트하기 어려움

## 암묵적 입력과 출력 줄이기
```javascript
// as-is
function update_shipping_icons() {
  // ...
  for(var i = 0; i < buttons.length; i++) {
    // ...
    var new_cart = add_item(shopping_cart, item.name, item.price);
    //                      ~~~~^ 전역 변수를 읽고 있음
  }
}

// to-be
function update_shipping_icons(cart) {
  // ...                       ~~~~ 인자로 변경함
  for(var i = 0; i < buttons.length; i++) {
    // ...
    var new_cart = add_item(cart, item.name, item.price);
  }
}
```