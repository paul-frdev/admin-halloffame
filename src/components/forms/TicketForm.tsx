import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form, Input } from 'antd';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import { createTicket } from '../../store/ticketSlice';
import { resetStateImages } from '../../store/uploadImageSlice';


const validationSchema = yup.object().shape({
  title: yup.string().required('Field title is required'),
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string().required('Public ID is required'),
      url: yup.string().required('Image URL is required'),
    })
  ).test('at-least-one-image', 'At least one image is required', function (value) {
    if (!value || value.length === 0) {
      return false;
    }
    return true;
  }).required('At least one image is required')
});

export const TicketForm = () => {

  const dispatch = useAppDispatch()

  const location = useLocation()
  const { tickets } = useAppSelector((state: RootState) => state.tickets)
  const { isLoading, isError, isSuccess, images } = useAppSelector((state: RootState) => state.uploadImages)

  const { control, handleSubmit, formState: { errors }, setValue, getValues, register, reset } = useForm({
    defaultValues: {
      title: '',
      images: []
    },
    resolver: yupResolver(validationSchema),
  });

  const ticketImageId = location.pathname.split("/")[3];

  const onSubmit: SubmitHandler<any> = (data) => {
    try {
      dispatch(createTicket(data))
      dispatch(resetStateImages())
      reset();
      toast.success('Ticket images added successfully')
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  const onImageUpload = (uploadedImages: ImagesProps[]) => {

    const simplifiedImagesUrls = uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any);
    setValue('images', simplifiedImagesUrls, { shouldValidate: true });

    return simplifiedImagesUrls
  }

  return (
    <div>
      <Title level={3}>{ticketImageId !== undefined ? "Edit" : "Add"} Ticket Image</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <UploadImages
          register={register('images')}
          name='images'
          uploadedImages={onImageUpload}
          errors={errors.images}
        />
        <FormItem name='title' control={control} label='Enter title' help>
          <Input size="large" />
        </FormItem>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}