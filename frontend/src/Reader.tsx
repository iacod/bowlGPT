import { Button, Text, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client';

interface ReaderProps {
    socket : Socket;
}

function Reader(props : ReaderProps) {
    const { socket } = props;
    const [ isNextActive, setIsNextActive ] = useState<boolean>(true);
    const [ text, setText ] = useState<string>('');

    useEffect(() => {
        socket.on('updated-text', (data) => {
            // console.log(data);
            setText(data);
        });

        return () => {
            socket.off('updated-text');
        };
    }, [socket]);

    useEffect(() => {
        console.log('isNextActive changed:', isNextActive);
      }, [isNextActive]);

    useEffect(() => {
        socket.on('lock-next', () => {
            console.log('ya cringle');
            setIsNextActive(false);
        });

        return () => {
            socket.off('lock-next');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('unlock-next', () => {
            setIsNextActive(true);
        });

        return () => {
            socket.off('unlock-next');
        };
    }, [socket]);

    const handleClick = () => {
        socket.emit('start-question');
    }

    return (
        <VStack>
            <Button size="lg" colorScheme='gray' onClick={handleClick} isDisabled={!isNextActive}>Next</Button>
            <Text>{text}</Text>
        </VStack>
    )
}

export default Reader;