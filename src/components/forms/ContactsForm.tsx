import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form, Input } from 'antd';
import { FormItem as CustomItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useState } from 'react';
import { Map } from '../map/Map';
import ConfigProvider from "antd/es/config-provider";
import PhoneInput from "antd-phone-input";
import { createContact, getContactId, getContacts, updateContact } from '../../store/contentSlice';
import FormItem from "antd/es/form/FormItem";


const validationSchema = yup.object().shape({
  contacts_title: yup.string().required('Field title is required'),
  contacts_address: yup.string().required('Field address is required'),
  contacts_email: yup.string().email('Invalid email format'),
  contacts_id: yup.string(),
  contacts_phone: yup.string().required('Phone number is required'),
});

export const ContactsForm = () => {

  const [phoneToObject, setPhoneToObject] = useState<any>()
  const [contactsId, setContactsId] = useState('')
  const dispatch = useAppDispatch()

  const { contacts, isError, message } = useAppSelector((state: RootState) => state.content)

  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      contacts_title: '',
      contacts_address: '',
      contacts_id: '',
      contacts_email: '',
      contacts_phone: ''
    },
    resolver: yupResolver(validationSchema),
  });


  useEffect(() => {
    if (isError) {
      toast.warn(`ERROR: ${message}`)
    }
  }, [isError])


  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])

  useEffect(() => {
    setContactsId(contacts?.contacts_id!)
  }, [contacts])


  useEffect(() => {
    setContactsId(contacts?.contacts_id!)
    if (contactsId !== undefined) {
      dispatch(getContactId(contactsId))
    }
  }, [contacts?.contacts_id])


  useEffect(() => {
    setValue('contacts_id', contacts?.contacts_id)
    setValue('contacts_email', contacts?.contacts_email!)
    setValue('contacts_title', contacts?.contacts_title!)
    setValue('contacts_address', contacts?.contacts_address!)
    setValue('contacts_phone', contacts?.contacts_phone!)
  }, [contacts, setValue])

  const validator = (_: any, { valid }: any) => {
    if (valid()) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  }

  const handlePhoneNumber = (contactsPhone: any) => {
    if (!contactsPhone.areaCode || !contactsPhone.phoneNumber) return;

    const formattedAreaCode = contactsPhone.areaCode.replace(/"/g, '');
    const formattedPhoneNumber = contactsPhone.phoneNumber.replace(/"/g, '');

    const formattedPhone = `+${contactsPhone.countryCode}${formattedAreaCode}${formattedPhoneNumber}`;
    setValue('contacts_phone', formattedPhone);
  }


  const convertToPhoneInputObject = (phoneNumberString: string) => {
    if (phoneNumberString === undefined) return;

    const countryCode = phoneNumberString.slice(1, 3);
    const areaCode = phoneNumberString.slice(3, 5);
    const phoneNumber = phoneNumberString.slice(5);

    const phoneInputObject = {
      countryCode: `+${countryCode}`,
      areaCode: `${areaCode}`,
      phoneNumber: `${phoneNumber}`,
    };

    return phoneInputObject;
  };

  useEffect(() => {
    const convertedPhone = convertToPhoneInputObject(getValues().contacts_phone)
    setPhoneToObject(convertedPhone)
  }, [contacts?.contacts_phone])

  const onSubmit: SubmitHandler<any> = async (data) => {

    try {
      if (contactsId === undefined) {
        await dispatch(createContact(data))
        toast.success('Contacts added successfully')
      } else {
        await dispatch(updateContact(data));
        await dispatch(getContacts())
      }
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  return (
    <div>
      <Title level={3}>{contactsId !== undefined ? "Edit" : "Add"} Contacts</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <CustomItem name='contacts_title' control={control} label='Enter title' help>
          <Input size="large" />
        </CustomItem>
        <CustomItem name='contacts_email' control={control} label='Enter email' help>
          <Input size="large" />
        </CustomItem>
        <ConfigProvider>
          <FormItem
            name="contacts_phone"
            rules={[{ validator }]}
            label='Enter a phone number'
            help
          >
            <PhoneInput
              defaultValue={phoneToObject}
              enableSearch
              onChange={(value) => handlePhoneNumber(value)}
            />
          </FormItem>
        </ConfigProvider>
        <Map
          name='contacts_address'
          location={getValues().contacts_address}
          valueAddress={getValues().contacts_address}
          setSelectedAddress={(data: string) => setValue('contacts_address', data)}
          error={errors.contacts_address}
        />
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            {contactsId === undefined ? "Create" : "Edit and save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
