import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: var(--bg-secondary);
  padding: 3rem 0;
  margin-top: 5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Link = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Links>
          <Link href="#">隐私政策</Link>
          <Link href="#">使用条款</Link>
          <Link href="#">关于我们</Link>
          <Link href="#">联系支持</Link>
        </Links>
        <Copyright>
          © 2024 吉马程序员. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;