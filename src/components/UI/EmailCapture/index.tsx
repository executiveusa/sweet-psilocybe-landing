'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { subscribeEmail, isSupabaseConfigured } from '../../../../libs/supabase';
import {
  Wrapper,
  Inner,
  Header,
  FormWrapper,
  Input,
  SubmitButton,
  Message,
  ErrorText,
  Disclaimer,
  DemoModeNotice,
} from './styles';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

const EmailCapture = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setStatus('loading');
    setMessage('');

    try {
      const result = await subscribeEmail(data.email, 'coming-soon');

      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setIsDemoMode(!!result.isDemoMode);
        reset();
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Email capture error:', error);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <Wrapper>
      <Inner>
        <Header>
          <h2>
            Be the First to <span>Know</span>
          </h2>
          <p>
            Get early access when we launch our full platform. No spam, just science and updates
            about psilocybin research, games, and new merch drops.
          </p>
        </Header>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <SubmitButton type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'Notify Me'}
          </SubmitButton>
        </FormWrapper>

        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        {message && <Message $isError={status === 'error'}>{message}</Message>}

        {isDemoMode && status === 'success' && (
          <DemoModeNotice>
            <p>
              <strong>Demo Mode:</strong> To save emails to your database, follow the setup
              instructions in <code>SUPABASE-SETUP.md</code>
            </p>
          </DemoModeNotice>
        )}

        <Disclaimer>
          We respect your privacy. Unsubscribe anytime.{' '}
          <a href="#privacy">Privacy Policy</a>
        </Disclaimer>
      </Inner>
    </Wrapper>
  );
};

export default EmailCapture;
