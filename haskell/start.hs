add :: Int -> Int -> Int
add x y = x + y

multiply :: Int -> Int -> Int
multiply x y = x * y

applyTwice :: (Int -> Int) -> Int -> Int
applyTwice f x = f (f x)
-- applyTwice (*2) 3
-- 하스켈의 연산자 * 는 함수이다. Int -> Int -> Int 로 구성되어있음
-- 하스켈에서는 모든 함수가 기본적으로 커링 되어있음 -> 하나의 인수를 받고 나머지 인수를 받는 새로운 함수로 반환하도록 설계