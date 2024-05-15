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

# 계산 분류하기

계산에도 동작과 비즈니스 규칙을 그룹화해서 나눈다.

## 원칙: 설계는 엉켜있는 코드를 푸는 것이다

작을수록 재사용하기 쉽고, 유지보수하기 쉽고, 테스트하기 쉽다.

## add_item()을 분리해 더 좋은 설계 만들기

계산에서도 나눌 수 있는 부분을 살펴보고 구조를 기준으로 나눈다. 

1. item 구조만 알 수 있게 분리
```javascript
function make_cart_item(name, price) {
  return { name: name, price: price }
}
```

2. cart 구조만 알 수 있도록 분리
```javascript
function add_item(cart, item) {
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}

add_item(shopping_cart, make_cart_item("shoes", 3.45));
```

## 카피-온-라이트 패턴을 빼내기

`add_item` 함수의 구현이 어느 배열에나 사용할 수 있도록 일반적으로 변했음  
함수의 이름과 인자의 이름은 현재 일반적이지 않기 때문에 바꿔보자

```javascript
function add_element_last(array, element) {
  var new_array = array.slice();
  new_array.push(element);
  return new_array;
}
```
이제 재사용할 수 있는 유틸리티 함수가 되었다.

## 계산을 분류하기

계산도 구조를 기준으로 나눌 수 있다. 기능과 비즈니스 규칙에는 차이가 존재한다.  
기능은 일반적인 개념으로 동작하는 방식이 비슷할 수 있지만 비즈니스 규칙은 회사마다 운영방식이 다를 수 있는 특별한 규칙이라고 할 수 있다.

비즈니스 규칙은 기능보다 더 빠르게 바뀐다.