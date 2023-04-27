import { useState, useEffect } from 'react';
import { Socket } from "socket.io-client";
import {
  Button,
  Input,
  HStack
} from '@chakra-ui/react'

interface BuzzerProps {
  socket : Socket;
}

function Buzzer(props: BuzzerProps) {
  const { socket } = props;
  const [isBuzzed, setIsBuzzed] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = () => {
    setIsBuzzed(!isBuzzed);

    if (isBuzzed) {
      console.log(inputValue);
      socket.emit('answer', inputValue);
      setInputValue('');
    } else {
      console.log('buzzed')
      socket.emit('buzz')
    }
  }

  useEffect(() => {
    socket.on('lock-buzzer', () => {
      setIsActive(false);
      console.log('locked')
    });

    return () => {
      socket.off('lock-buzzer');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('unlock-buzzer', () => {
      setIsActive(true);
      console.log('unlocked')
    });

    return () => {
      socket.off('unlock-buzzer');
    };
  }, [socket]);

  return (
    <HStack>
      <Input
        color='gray'
        w='auto'
        display='inline-flex'
        isDisabled={!isBuzzed}
        placeholder='Answer'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button size="lg" colorScheme='gray' onClick={handleClick} isDisabled={!isActive}>
        {isBuzzed ? 'Submit' : 'Buzz'}
      </Button>
    </HStack>
  );
}

export default Buzzer;
