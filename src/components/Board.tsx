import { Box, Text } from '@chakra-ui/react';
import { BoardType } from '../App';
import { Link } from 'react-router-dom';

interface BoardProps {
    board: BoardType;
}

export const Board = ({ board }: BoardProps) => {
    const createdDate = new Date(board.createdDate).toLocaleString();
    const modifiedDate = new Date(board.modifiedDate).toLocaleString();

    return (
        <Box
            bg="gray.200"
            m="10px"
            p="20px"
            borderRadius="10px"
            boxShadow="lg"
        >
            <Link to={ `/update/${ board.id }` } style={ { textDecoration: 'none' } }>
                <Text fontSize="xl" fontWeight="bold" fontFamily="Open Sans">
                    { board.title }
                </Text>
            </Link>
            <Text mt="4">{ board.content }</Text>
            <Text fontSize="sm" mt="2" color="gray.500">
                Created: { createdDate }
            </Text>
            <Text fontSize="sm" color="gray.500">
                Modified: { modifiedDate }
            </Text>
        </Box>
    );
};