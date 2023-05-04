/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 * https://github.com/umijs/umi-request#interceptor
 */
import {extend} from 'umi-request';
import {history} from "@@/core/history";
import {message} from "antd";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    credentials: 'include', // 默认请求是否带上cookie
});
/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
    console.log(`do request url = ${url}`)
    return {
        url,
        options: {
            ...options,
            headers: {},
        },
    };
});
/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
    // const res = await response.clone().json();
    // console.log(res)
    // if(res.code===200){
    //     return res.data;
    // }
    const res = await response.clone().json();
    if (res.code === 200) {
        return res.data;
    }
    if (res.code === 40100) {
        message.error("请先登录");
        const {query} = history.location;
        history.push({
            pathname: '/user/login',
            query,
        });
    } else {
        message.error(res.description)
    }
    return res.data;
});
export default request;
