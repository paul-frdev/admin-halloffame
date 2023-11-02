import { useFormik } from "formik";
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { UploadImages } from '../common/UploadImages';
import { uploadImg } from '../../store/uploadImageSlice';
import { CustomInput } from '../ui/CustomInput';



export const TicketForm = () => {

  const dispatch = useAppDispatch()
  const imagesState = useAppSelector((state: RootState) => state.uploadImages.images)

  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];


  imagesState.forEach((i) => {
    imagesCloudinary.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      image: imagesCloudinary
    },

    onSubmit: async (values) => {
      dispatch(uploadImg(values))
    },
  });



  return (
    <div>
      <h3 className="mb-4  title">
        add event ticket
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <UploadImages />
        <CustomInput
          type='text'
          label='Enter Event title'
          name='title'
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          formikTouched={formik.touched.title}
          formikErrors={formik.errors.title}
        />
        <Button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Create event ticket
        </Button>
      </form>
    </div>
  )
}