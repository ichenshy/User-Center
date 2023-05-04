import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormText, LoginForm} from '@ant-design/pro-form';
// @ts-ignore
import {useIntl, history, FormattedMessage, SelectLang} from 'umi';
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
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

const Register: React.FC = () => {
    const [userLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const intl = useIntl();

    const handleSubmit = async (values: API.RegisterParams) => {
        // 校验
        const {userPassword, checkPassword} = values
        if (userPassword !== checkPassword) {
            message.error("确认密码不一致");
            return;
        }
        try {
            // 注册
            const id = await register(values);
            if (id) {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.register.success',
                    defaultMessage: '注册成功！',
                });
                message.success(defaultLoginSuccessMessage);
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const {query} = history.location;
                // const {redirect} = query as { redirect: string };
                // history.push("/user/login?redirect" + redirect);
                history.push({
                    pathname: "/user.login",
                    query,
                })
                return;
            }
        } catch (error) {
            const defaultLoginFailureMessage = '注册失败，请重试！'
            // @ts-ignore
            message.error(defaultLoginFailureMessage);
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
                    submitter={{
                        searchConfig: {
                            submitText: "注册"
                        }
                    }}
                    logo={<img alt="logo" src={SYSTEM_LOGO}/>}
                    title="Ant  Design"
                    subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.RegisterParams);
                    }}>

                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane
                            key="account"
                            tab={intl.formatMessage({
                                id: 'pages.register.accountLogin.tab',
                                defaultMessage: '账号密码注册',
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
                            <ProFormText
                                name="planetCode"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.Code.required',
                                    defaultMessage: '请输入星球id',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入星球id"
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
                            <ProFormText.Password
                                name="checkPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.required1',
                                    defaultMessage: '请再次输入密码',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.password.required1"
                                                defaultMessage="请再次输入密码！"
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
            <Footer/>
        </div>
    );
};

export default Register;
