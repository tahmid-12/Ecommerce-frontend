import ResetPassword from "@/components/auth/ResetPassword"
import SubTitle from "@/components/auth/SubTitle"
import Title from "@/components/auth/Title"


function ResetPasswordPage() {
    return (
        <div className='pb-10 pt-5'>
            <div className='w-[80%] mx-auto'>
                <Title title={'Reset Your Password'} />
                <SubTitle subTitle={"Lorem Ipsum is simply dummy text of the printing and "} />
            </div>
            <div className='w-[80%] mx-auto'>
                <ResetPassword/>
            </div>

        </div>
    )
}

export default ResetPasswordPage