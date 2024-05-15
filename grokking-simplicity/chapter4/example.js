// as-is
function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price
  });

  calc_cart_total();
}

// to-be 함수 추출하기
function add_item_to_cart(name, price) {
  add_item(name, price);
  calc_cart_total();
}

function add_item(name, price) {
  shopping_cart.push({ name: name, price: price }); // -> 아직 액션
}

// 암묵적 입력과 출력 찾기
// 암묵적 입력: add_item, 전역 변수를 읽고 있음
// 암묵적 출력: .push, 전역 변수를 변경하고(출력) 있음
// -> 인자와 리턴 값으로 바꾸기

// to-be 암묵적 입력 제거하기
function add_item_to_cart(name, price) {
  add_item(shopping_cart, name, price);
  calc_cart_total();
}

function add_item(cart, name, price) {
  cart.push({ name: name, price: price })
}

// to-be 암묵적 출력 제거하기
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_totla();
}

function add_item(cart, name, price) {
  var new_cart = cart.slice();
  new_cart.push({ name: name, price: price })
  return new_cart
}
