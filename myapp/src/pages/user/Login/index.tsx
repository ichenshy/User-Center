import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
// @ts-ignore
import {useIntl, history, FormattedMessage, SelectLang, useModel} from 'umi';
import {ProFormText, LoginForm} from '@ant-design/pro-form';
import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/pages/constant";

const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);
const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const {initialState, setInitialState} = useModel('@@initialState');

    const intl = useIntl();

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            await setInitialState((s) => ({
                ...s,
                currentUser: userInfo,
            }));
        }
    };

    const handleSubmit = async (values: API.LoginParams) => {
        try {
            // 登录
            const user = await login({...values, type});
            if (user) {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const {query} = history.location;
                const {redirect} = query as { redirect: string };
                history.push(redirect || '/1');
                return;
            }
            // 如果失败去设置用户错误信息
            setUserLoginState(user);
        } catch (error) {

        }
    };
    const {status, type: loginType} = userLoginState;
    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang/>}
            </div>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src={SYSTEM_LOGO}/>}
                    title="Ant  Design"
                    subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane
                            key="account"
                            tab={intl.formatMessage({
                                id: 'pages.login.accountLogin.tab',
                                defaultMessage: '账号密码登录',
                            })}
                        />
                    </Tabs>

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账号或密码错误',
                            })}
                        />
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.username.required',
                                    defaultMessage: '请输入账号',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.username.required"
                                                defaultMessage="请输入账号!"
                                            />
                                        ),
                                    },
                                    {
                                        min: 4,
                                        type: 'string',
                                        message: "长度不能小于4位"
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.required',
                                    defaultMessage: '请输入密码',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.password.required"
                                                defaultMessage="请输入密码！"
                                            />
                                        ),
                                    },
                                    {
                                        min: 6,
                                        type: 'string',
                                        message: "长度不能小于6位"
                                    }
                                ]}
                            />
                        </>
                    )}
                </LoginForm>
            </div>
            <button><a href={"/user/register"}>新用户注册</a></button>
            <Footer/>
        </div>
    );
};

export default Login;
