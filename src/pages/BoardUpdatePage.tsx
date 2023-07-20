import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, HStack, Input, Textarea, useToast, VStack } from '@chakra-ui/react';
import { CommentType } from '../App';
import { Comment } from '../components/Comment';
import { ArrowRightIcon } from '@chakra-ui/icons';

export const BoardUpdatePage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<CommentType[]>();

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/${ id }`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);

                axios.get(`http://localhost:8080/api/comments/${ id }`)
                    .then((response) => {
                        setComments(response.data);
                    });
            });
    }, []);

    const onSubmit = () => {
        axios.put(`http://localhost:8080/api/board/${ id }`, {
            title: title,
            content: content,
        }).then((response) => {
            navigate('/');

            toast({
                title: '게시글이 수정되었습니다.',
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }).catch((error) => {
            toast({
                title: '게시글 수정에 실패했습니다.',
                status: 'error',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        });
    };

    const onDelete = () => {
        window.confirm('삭제하시겠습니까?') && (
            axios.delete(`http://localhost:8080/api/board/${ id }`)
                .then((response) => {
                    navigate('/');
                    toast({
                        title: '게시글이 삭제되었습니다.',
                        status: 'success',
                        position: 'top',
                        duration: 3000,
                        isClosable: true,
                    });
                })
                .catch((error) => {
                    toast({
                        title: '게시글 삭제에 실패했습니다.',
                        status: 'error',
                        position: 'top',
                        duration: 3000,
                        isClosable: true,
                    });
                })
        );
    };

    const onCreateComment = () => {
        axios.post('http://localhost:8080/api/comment', {
            boardId: id,
            content: comment,
        })
            .then((response) => {
                navigate(0);

                toast({
                    title: '댓글이 작성되었습니다.',
                    status: 'success',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: '댓글 작성에 실패했습니다.',
                    status: 'error',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            });

        // reload
    };

    return (
        <Box>
            <Box p={ '20px' } m={ '100px' } borderRadius={ 'lg' } boxShadow={ 'xl' } bg={ 'white' }>
                <VStack spacing={ 10 } align={ 'center' }>
                    <FormControl>
                        <FormLabel fontSize={ '30px' } fontFamily={ 'Nanum Gothic' }
                                   fontWeight={ 'bold' }>제목</FormLabel>
                        <Input
                            placeholder={ 'Title' }
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={ '25px' } fontFamily={ 'Nanum Gothic' }
                                   fontWeight={ 'bold' }>내용</FormLabel>
                        <Textarea
                            placeholder={ 'Content' }
                            value={ content }
                            onChange={ (e) => setContent(e.target.value) }
                        />
                    </FormControl>
                    <HStack>
                        <Button colorScheme="twitter" onClick={ onSubmit }>
                            제출
                        </Button>
                        <Button colorScheme="red" onClick={ onDelete }>
                            삭제
                        </Button>
                    </HStack>
                </VStack>
            </Box>
            <Box px={ '50px' }>
                <HStack>
                    <Input placeholder={ '댓글을 입력하세요.' } value={ comment } onChange={ (e) => {
                        setComment(e.target.value);
                    } } />
                    <Button colorScheme="twitter" leftIcon={ <ArrowRightIcon /> }
                            onClick={ onCreateComment }>입력</Button>
                </HStack>
            </Box>
            <Box>
                {
                    comments?.map((comment) => (
                        <Comment comment={ comment } key={ comment.id } />
                    ))
                }
            </Box>
        </Box>
    );
};