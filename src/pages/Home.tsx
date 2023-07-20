import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Board } from '../components/Board';
import { BoardType } from '../App';

export const Home = () => {
    const [boards, setBoards] = useState<BoardType[]>([]);
    const navigation = useNavigate();

    const onCreateButtonClick = () => {
        navigation('/create');
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/boards')
            .then((response) => {
                setBoards(response.data);
            });
    }, []);

    return (
        <Flex align="center" justify="center" minHeight="100vh">
            <Box p={ 4 } maxWidth="600px" width="100%">
                <VStack spacing={ 4 } align="stretch">
                    <Button colorScheme="twitter" onClick={ onCreateButtonClick }>Create</Button>
                    {
                        boards.map((board) => (
                            <Board key={ board.id } board={ board } />
                        ))
                    }
                </VStack>
            </Box>
        </Flex>
    );
};