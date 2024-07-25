import { useState, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { token, userID as userId } from '~/routes/Login';
import { useDispatch } from 'react-redux';
import { alertShow } from '~/actions';

interface AddRecipesProps {
    closeModal: () => void;
}

function AddRecipes({ closeModal }: AddRecipesProps) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [recipeImgName, setRecipeImgName] = useState<File | null>(null);

    const onSubmit = async (data: any) => {
        if (!recipeImgName) {
            setError('recipeImgName', {
                type: 'manual',
                message: 'Please provide a valid recipe image.'
            });
            return;
        }

        const formData = new FormData();
        formData.append('recipeName', data.recipeName);
        formData.append('recipeIngrendients', data.recipeIngrendients);
        formData.append('recipeProcess', data.recipeProcess);
        formData.append('recipeImgName', recipeImgName);
        formData.append('userId', userId);

        try {
            let response = await fetch('http://localhost:5000/api/posts/createPost', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                },
                body: formData,
            });

            response = await response.json();

            console.log(response);
            dispatch(alertShow('Post Request SuccessFull!', { type: 'success', icon: 'bell', timeout: 5 }));
            closeModal();
        } catch (error) {
            console.log('Error submitting form:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRecipeImgName(file);
            clearErrors('recipeImgName');
        } else {
            setRecipeImgName(null);
            setError('recipeImgName', {
                type: 'manual',
                message: 'Please provide a valid recipe image.'
            });
        }
    };

    useEffect(() => {
        register('recipeImgName', {
            validate: () => {
                if (!recipeImgName) {
                    return 'Please provide a valid recipe image.';
                }
                return true;
            }
        });
    }, [register, recipeImgName]);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="recipeName" className="mb-4">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipe name"
                        {...register('recipeName', { required: 'Please provide a valid recipe name.' })}
                        className={`input-modern ${errors.recipeName ? 'is-invalid' : ''}`}
                    />
                    {errors.recipeName && <div className="invalid-feedback">{(errors.recipeName as FieldError).message}</div>}
                </Form.Group>
                <Form.Group controlId="recipeImage" className="mb-4">
                    <Form.Label>Recipe Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        className={`input-modern ${errors.recipeImgName ? 'is-invalid' : ''}`}
                    />
                    {errors.recipeImgName && <div className="invalid-feedback">{(errors.recipeImgName as FieldError).message}</div>}
                </Form.Group>
                <Form.Group controlId="recipeIngrendients" className="mb-4">
                    <Form.Label>Recipe Ingredients</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter ingredients"
                        {...register('recipeIngrendients', { required: 'Please provide valid ingredients.' })}
                        className={`input-modern ${errors.recipeIngrendients ? 'is-invalid' : ''}`}
                    />
                    {errors.recipeIngrendients && <div className="invalid-feedback">{(errors.recipeIngrendients as FieldError).message}</div>}
                </Form.Group>
                <Form.Group controlId="recipeProcess" className="mb-4">
                    <Form.Label>Recipe Process</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter cooking process"
                        {...register('recipeProcess', { required: 'Please provide a valid cooking process.' })}
                        className={`input-modern ${errors.recipeProcess ? 'is-invalid' : ''}`}
                    />
                    {errors.recipeProcess && <div className="invalid-feedback">{(errors.recipeProcess as FieldError).message}</div>}
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn-modern">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default AddRecipes;
