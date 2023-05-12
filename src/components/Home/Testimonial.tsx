import Image from 'next/image';
import SystemUI from '../UI/SystemUI';
import user1 from '../../assets/user1.jpg';
import Left from '../../assets/Left.svg';
import Right from '../../assets/Right.svg';
export function Testimonial() {
  return (
    <section id="testimonal">
      <SystemUI>
        <div className="col-span-12">
          <div className="col-span-12 flex xl:gap-5 flex-col items-center relative before:content-[''] before:absolute before:top-1/2   before:-z-10 before:-trans-y-1/2 before:left-0 before:w-full before:h-1 before:bg-primary after:content-[''] after:absolute after:top-0  after:left-1/2 after:-translate-x-1/2 after:w-[128px] after:rounded-full after:h-32 after:-z-10 after:bg-[#5c6374]">
            <Image
              src={user1}
              alt="user"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <h1 className="text-attention text-center text-white">
            Marzia Ogaza
          </h1>
          <div className="relative">
            <p className="text-center  xl:px-16 mx-auto text-white text-attention xl:text-subHeading">
              I highly recommend this e-commerce website for all your shopping
              needs. The customer support team is helpful and responsive and the
              products are top quality.
            </p>
            <div className='hidden xl:block'>
              <button className="absolute top-1/2 -translate-x-1/2">
                <Image
                  src={Left}
                  alt="Button to go to the left of the testimonal"
                />
              </button>
              <button className="absolute top-1/2 -translate-x-1/2 right-0">
                <Image
                  src={Right}
                  alt="Button to go to the Right of the testimonal"
                />
              </button>
            </div>
          </div>
        </div>
      </SystemUI>
    </section>
  );
}
