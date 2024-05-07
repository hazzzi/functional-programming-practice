# 액션과 계산 데이터의 차이를 알기

- 액션과 계산, 데이터가 어떻게 다른지?
- 액션이 코드 전체로 퍼질수 있다는 것을 이해하기
- 이미 있는 코드에서 액션 찾기

## 액션
- 실행 시점과 횟수에 의존한다
- 부수 효과, 부수효과가 있는 함수, 순수하지 않은 함수라고 부른다

## 계산
- 입력으로 출력을 계산한다
- 순수함수, 수학함수라고 부르기도한다

## 데이터
- 이벤트에 대한 사실

### 액션이 코드 전체로 퍼지는 예시
```javascript
function figurePayout(affiliate) {
  var owed = affiliate.sales * affiliate.commission;
  if(owed > 100)
    sendPayout(affiliate.bank_code, owed);
}

function affiliatePayout(affiliates) {
  for(var a = 0; a < affiliates.length; a++)
    figurePayout(affiliates[a]);
}

function main(affiliates) {
  affiliatePayout(affiliates);
}
```
`sendPayout`만 액션이라고 생각할 수 있지만, `figurePayout`은 `sendPayout`에 의존하고있으므로 액션이고
`affiliatePayout`도 액션인 `figurePayout`에 의존하고 있고 `main`도 액션인 `affiliatePayout`에 의존하고 있음.
따라서 세 함수 실행 시점이라는 시간?에 의존하고 있게 됨.

**액션 === 부수효과**
