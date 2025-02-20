import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './Layout';
import { Heading, Text } from './Typography';
import { Button } from '@/components/ui/button';
import { NoResults } from '@jetstreamgg/widgets';

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <Layout>
      <div className="-mt-16 flex w-full grow flex-col items-center justify-center text-center">
        <div className="bg-container flex max-w-[650px] flex-col items-center gap-3 rounded-3xl border p-12 bg-blend-overlay backdrop-blur-[50px]">
          <NoResults />
          <Heading tag="h3" variant="large" className="text-[32px] leading-9">
            Page not found
          </Heading>
          <Heading tag="h1" variant="large" className="text-[82px] leading-[96px]">
            Lost in the Sky?
          </Heading>
          <Text variant="large" className="text-text">
            Seems like you&apos;ve ventured into the unknown. Click the button to find your way back (you will
            be redirected to the homepage in 5 seconds)
          </Text>
          <Button variant="primary" className="mt-1 self-center" onClick={() => navigate('/')}>
            Homepage
          </Button>
        </div>
      </div>
    </Layout>
  );
}
