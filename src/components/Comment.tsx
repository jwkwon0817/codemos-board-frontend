import { Box, Button, HStack, Input, Spacer, Text, useToast } from '@chakra-ui/react';
import { CommentType } from '../App';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CommentProps {
    comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
    const createdDate = new Date(comment.createdDate).toLocaleString();
    const modifiedDate = new Date(comment.modifiedDate).toLocaleString();

    const [content, setContent] = useState<string>(comment.content);
    const [updatedDate, setUpdatedDate] = useState<string>(modifiedDate);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

    const navigate = useNavigate();

    const toast = useToast();

    const onUpdateButtonClick = () => {
        setIsUpdateMode(!isUpdateMode);

        if (isUpdateMode) {
            axios.put(`http://localhost:8080/api/comment/${ comment.id }`, {
                boardId: comment.boardId,
                content: content,
            }).then((response) => {
                setContent(response.data.content);
                setUpdatedDate(new Date(response.data.modifiedDate).toLocaleString());
                setIsUpdateMode(false);

                toast({
                    title: '댓글이 수정되었습니다.',
                    status: 'success',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            }).catch((error) => {
                toast({
                    title: '댓글 수정에 실패했습니다.',
                    status: 'error',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            });
        }
    };

    const onDeleteButtonClick = () => {
        window.confirm('삭제하실건가요?') && (
            axios.delete(`http://localhost:8080/api/comment/${ comment.id }`)
                .then((response) => {
                    navigate(0);
                })
                .catch((error) => {
                    toast({
                        title: '댓글 삭제에 실패했습니다.',
                        status: 'error',
                        position: 'top',
                        duration: 3000,
                        isClosable: true,
                    });
                })
        );
    };

    return (
        <Box p={ '20px' } m={ '20px' } bgColor={ 'gray.300' }>
            <HStack>
                {
                    isUpdateMode ? (
                        <Input
                            placeholder={ '댓글을 수정해 주세요.' }
                            value={ content }
                            onChange={ (e) => {
                                setContent(e.target.value);
                            } } />
                    ) : (
                        <Text fontSize={ 'xl' } fontWeight={ 'bold' }
                              fontFamily={ 'Open Sans' }>{ content }</Text>
                    )
                }
                <Spacer />
                <Button mt={ '2' } colorScheme={ 'red' } leftIcon={ <DeleteIcon /> }
                        onClick={ onDeleteButtonClick }>삭제</Button>
            </HStack>
            <Text fontSize={ 'sm' } mt={ '2' } color={ 'gray.500' }>Created: { createdDate }</Text>
            <Text fontSize={ 'sm' } mt={ '2' } color={ 'gray.500' }>Modified: { updatedDate }</Text>
            <Button mt={ '2' } colorScheme={ 'blue' } leftIcon={ <EditIcon /> }
                    onClick={ onUpdateButtonClick }>{ isUpdateMode ? '저장' : '수정' }</Button>
        </Box>
    );
};