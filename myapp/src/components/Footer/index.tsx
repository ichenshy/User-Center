import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'pages.layouts.userLayout.title',
    defaultMessage: 'Galaxy',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Galaxy1',
          title: 'Galaxy',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '#',
          blankTarget: true,
        },
        {
          key: 'Galaxy',
          title: 'Galaxy',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
