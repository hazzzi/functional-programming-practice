function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  var total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons(cart);
  update_tax_dom();
}

function set_cart_total_dom(cart_total) {
  cart_total;
}

function update_tax_dom(cart_total) {
  set_tax_dom(calc_tax(cart_total));
}

// 크고 많은 일을 하고 있음.
function update_shipping_icons(cart) {
  // 1. 모든 버튼을 가져오기
  var buy_buttons = get_buy_buttons_dom();
  // 2. 버튼을 가지고 반복하기
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    // 3. 버튼에 관련된 제품을 가져오기
    var item = button.item;
    // 4. 가져온 제품을 가지고 새 장바구니 만들기
    var new_cart = add_item(cart, item.name, item.price);
    // 5. 장바구니가 무료배송이 필요한지 확인하기
    if (gets_free_shipping(new_cart))
      // 6. 아이콘 표시하거나 감추기
      button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

// 하나의 분류에만 속하도록 변경하는 방법?
// 버튼, 장바구니 두가지로 분류해보기, 비즈니스 로직
// 버튼: 1, 2, 3, 6
// 장바구니: 4, 5
// 비즈니스 로직: 5, 6

// B - 비즈니스 로직
// 5. 장바구니가 무료배송이 필요한지 확인하기
// 6. 아이콘 표시하거나 감추기
function toggle_free_shipping_icon(cart, button) {
  if (gets_free_shipping(cart))
    button.show_free_shipping_icon();
  else button.hide_free_shipping_icon();
}

function make_cart_item(name, price) {
  return { name: name, price: price }
}

function update_shipping_icons(cart) {
  // 1. 모든 버튼을 가져오기
  var buy_buttons = get_buy_buttons_dom();
  // 2. 버튼을 가지고 반복하기
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    // 3. 버튼에 관련된 제품을 가져오기
    var item = button.item;
    var new_cart = add_item(cart, make_cart_item(item));
    toggle_free_shipping_icon(new_cart, item, button)
  }
}

// as-is
// 1, 2, 3 - 구매하기와 관련된 동작
// 4, 5 - cart와 item
// 6 - dom과 관련된

function set_free_shipping_icon(button, isShown) {
  if (isShown)
    button.show_free_shipping_icon();
  else button.hide_free_shipping_icon();
}

function get_free_shipping_with_item(cart, item) {
  // 4. 가져온 제품을 가지고 새 장바구니 만들기
  var new_cart = add_item(cart, item);
  // 5. 장바구니가 무료배송이 필요한지 확인하기
  return gets_free_shipping(new_cart)
}

function update_shipping_icons(cart) {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    var is_free_shipping = get_free_shipping_with_item(cart, item);
    set_free_shipping_icon(button, is_free_shipping)
  }
}