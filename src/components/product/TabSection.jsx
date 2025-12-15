import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs'
import {FaPagelines, FaScaleUnbalanced} from "react-icons/fa6";

function TabSection({product}) {
    const tabTrigger = 'data-[state=active]:border-[1px] data-[state=active]:bg-white data-[state=active]:border-primary data-[state=active]:rounded-full'
    return (
        <Tabs defaultValue="description" className="md:block hidden w-full  mt-10">
            <TabsList className="grid w-[400px] mx-auto grid-cols-2 gap-3 border-none bg-white">
                <TabsTrigger value="description" className={tabTrigger}>DESCRIPTION</TabsTrigger>
                <TabsTrigger value="review" className={tabTrigger}>REVIEWS</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
                <div className='h-full flex items-start'>
                    <div className='w-[50%] centerAll'>
                        <div className='w-[70%] mx-auto  centerAll flex-col'>
                            <FaPagelines className='text-4xl mb-8 text-gray-300'/>
                            <h3 className='text-md font-bold mb-2'>Details and product description</h3>
                            <p className='text-center text-gray-500'>{product?.short_desc}</p>
                        </div>
                    </div>
                    <div className='w-[50%] centerAll'>
                        <div className='w-[70%] mx-auto centerAll flex-col'>
                            <FaScaleUnbalanced className='text-4xl mb-8 text-gray-300'/>
                            <h3 className='text-md font-bold mb-2'>Details and product description</h3>
                            <p className='text-center text-gray-500'>{product?.long_desc} </p>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="review">
                <div className='h-[300px] flex'>
                    <div className='w-full centerAll'>
                        <div className='w-[90%] mx-auto  centerAll flex-col'>
                            <FaPagelines className='text-4xl mb-8 text-gray-300'/>
                            <h3 className='text-md font-bold mb-2'>Product review section</h3>
                            <p className='text-center text-gray-500 w-[50%] mx-auto'>Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Vel consequatur porro eos nobis </p>
                        </div>
                    </div>

                </div>
            </TabsContent>
        </Tabs>
    )
}

export default TabSection