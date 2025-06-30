import { Button } from '@/components/ui/button';
import { QueryParams } from '@/lib/constants';
import { Heading } from '@/modules/layout/components/Typography';
import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CHATBOT_NAME } from '../constants';
import { Close } from '@/modules/icons';

export const ChatHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleBack = () => {
    searchParams.set(QueryParams.Chat, 'false');
    searchParams.set(QueryParams.Details, 'true');
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="border-b-brandMiddle/55 block w-full border-b p-4 px-5 md:hidden">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-6 p-0" onClick={handleBack}>
            <ChevronLeft className="text-textSecondary" />
          </Button>
          <img src="/images/chatbot_logo.svg" alt={`${CHATBOT_NAME} avatar`} width={32} height={32} />
          <Heading variant="extraSmall" className="leading-5 tracking-normal">
            {CHATBOT_NAME}
          </Heading>
        </div>
      </div>
      <div id="pepe" className="relative hidden md:block">
        <Button variant="ghost" className="absolute right-4 top-4 h-10 w-10 p-0" onClick={handleBack}>
          <Close boxSize={18} />
        </Button>
      </div>
    </>
  );
};
