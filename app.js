// .env 파일에서 환경 변수를 로드합니다.
require('dotenv').config()

// 필요한 모듈들을 가져옵니다.
const fs = require('fs'); // 파일 시스템 모듈
const express = require('express'); // Express 웹 프레임워크
const path = require('path'); // 경로 관련 유틸리티
const morgan = require('morgan'); // HTTP 요청 로깅 미들웨어
const cookieParser = require('cookie-parser'); // 쿠키 파싱 미들웨어
const session = require('express-session'); // 세션 관리 미들웨어
const nunjucks = require('nunjucks'); // 템플릿 엔진

// 라우터 모듈을 가져옵니다.
const routes = require('./src/routes');

// 데이터베이스 연결을 위한 sequelize 가져오기
const { sequelize } = require('./src/database');

// Express 애플리케이션 생성
const app = express();

// 포트를 설정합니다. 환경변수 PORT가 없으면 9999로 설정합니다.
app.set('port', process.env.PORT || 8888);

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')))



// 데이터베이스와 동기화
sequelize.sync({ force: false }) // force: false는 기존 테이블을 유지
  .then(() => {
    console.log('데이터베이스 연결 성공'); // 성공적으로 연결되면 메시지 출력
  })
  .catch((err) => {
    console.error(err); // 에러 발생 시 에러 메시지 출력
  });

// 미들웨어 설정
app.use(morgan('dev')); // 개발 모드에서 HTTP 요청 로그 출력
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 데이터 파싱

// 기본 라우팅
app.use('/', routes)

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); // 에러 메시지 생성
  error.status = 404; // 에러 상태 코드 설정
  next(error); // 다음 미들웨어로 전달
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message; // 에러 메시지를 로컬 변수에 저장
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 프로덕션 모드가 아닌 경우 에러 정보 저장
  res.status(err.status || 500); // 상태 코드 설정
});

// 서버 시작
const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중'); // 서버가 시작되면 포트 출력
});
