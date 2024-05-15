# 더 좋은 액션 만들기

## 비즈니스 요구사항과 설계를 맞추기
- 기계적으로 액션에서 계산으로 리팩터링하는 것이 항상 최선의 구조를 만들지는 않음

```javascript
as-is
function gets_free_shipping(total, item_price) {
  return item_price + total >= 20;
}
```
비즈니스 요구사항으로 봤을 때는 맞지 않은 부분이 존재함.
요구사항은 "장바구니에 담긴 제품을 주문할 때 무료배송인지 확인하는 것"
구현된 함수에서는 장바구니로 무료배송을 확인하지 않고, 제품의 합계와 제품의 가격으로 확인 -> 여기서 불일치 발생함

```javascript
to-be
function gets_free_shipping(cart) {
  return calc_total(cart) >= 20
}
```
