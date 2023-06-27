export {default} from 'next-auth/middleware'


// 로그인이 된 사람만 이 경로에 접근 가능
export const config = {matcher: ["/admin/:path*", "/user"]}