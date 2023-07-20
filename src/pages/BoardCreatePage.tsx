import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BoardCreatePage = () => {
    const [title, setTitle] = useState<string>(localStorage.getItem('title') || '');
    const [content, setContent] = useState<string>(localStorage.getItem('content') || '');

    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async () => {
        await axios.post('http://localhost:8080/api/board', {
            title: title,
            content: content,
        })
            .then((response) => {
                localStorage.removeItem('title');
                localStorage.removeItem('content');
                navigate('/');

                toast({
                    title: '게시글이 등록되었습니다.',
                    position: 'top',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }).catch((error) => {
                toast({
                    title: '게시글 등록에 실패했습니다.',
                    position: 'top',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box p={ '20px' } m={ '100px' } borderRadius={ 'lg' } boxShadow={ 'xl' } bg={ 'white' }>
            <VStack spacing={ 10 } align={ 'center' }>
                <FormControl>
                    <FormLabel fontSize={ '30px' } fontFamily={ 'Nanum Gothic' } fontWeight={ 'bold' }>제목</FormLabel>
                    <Input
                        placeholder={ '제목을 적어주세요.' }
                        value={ title }
                        onChange={ (e) => {
                            setTitle(e.target.value);
                            localStorage.setItem('title', e.target.value);
                        } }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={ '25px' } fontFamily={ 'Nanum Gothic' } fontWeight={ 'bold' }>내용</FormLabel>
                    <Textarea
                        placeholder={ '내용을 적어주세요.' }
                        value={ content }
                        onChange={ (e) => {
                            setContent(e.target.value);
                            localStorage.setItem('content', e.target.value);
                        } }
                    />
                </FormControl>
                <Button colorScheme="twitter" onClick={ onSubmit }>
                    제출
                </Button>
            </VStack>
        </Box>
    );
};

