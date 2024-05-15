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

function update_shipping_icons(cart) {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    var new_cart = add_item(cart, item.name, item.price);
    if (gets_free_shipping(new_cart)) button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

function update_tax_dom(cart_total) {
  set_tax_dom(calc_tax(cart_total));
}
