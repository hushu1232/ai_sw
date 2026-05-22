import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactWrapper = styled.section`
  padding: 5rem 0;
  background: var(--bg-primary);
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)``;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    border-color: var(--primary-color);
  }
`;

const MethodIcon = styled.span`
  font-size: 1.8rem;
`;

const MethodContent = styled.div``;

const MethodLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const MethodValue = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
`;

const ContactForm = styled(motion.form)`
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  background: var(--bg-primary);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: rgba(148, 163, 184, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  background: var(--bg-primary);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: rgba(148, 163, 184, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
  }
`;

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('感谢您的留言,我们会尽快与您联系!');
  };

  return (
    <ContactWrapper id="联系">
      <ContactContent>
        <ContactInfo>
          <ContactTitle
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            联系我们
          </ContactTitle>
          <ContactDescription
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            如果您对我们的服务有任何疑问,或想了解更多信息,欢迎随时与我们联系。
            我们的专业团队将在24小时内回复您。
          </ContactDescription>
          <ContactMethod
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <MethodIcon>📧</MethodIcon>
            <MethodContent>
              <MethodLabel>邮箱</MethodLabel>
              <MethodValue>contact@jima.dev</MethodValue>
            </MethodContent>
          </ContactMethod>
          <ContactMethod
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <MethodIcon>📱</MethodIcon>
            <MethodContent>
              <MethodLabel>电话</MethodLabel>
              <MethodValue>400-888-8888</MethodValue>
            </MethodContent>
          </ContactMethod>
          <ContactMethod
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <MethodIcon>📍</MethodIcon>
            <MethodContent>
              <MethodLabel>地址</MethodLabel>
              <MethodValue>北京市海淀区中关村</MethodValue>
            </MethodContent>
          </ContactMethod>
        </ContactInfo>
        <ContactForm
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>发送消息</FormTitle>
          <FormGroup>
            <FormLabel>姓名</FormLabel>
            <FormInput type="text" placeholder="请输入您的姓名" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>邮箱</FormLabel>
            <FormInput type="email" placeholder="请输入您的邮箱" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>消息</FormLabel>
            <FormTextarea placeholder="请输入您的消息内容" required />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            发送消息
          </SubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactWrapper>
  );
};

export default Contact;