import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import BreadCrumbs from '../BreadCrumbs';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import ShareButton from '../ShareButton';
import ImageContainer from '../ImageContainer';
import PropertyRating from '@/components/card/PropertyRating';
import BookingCalendar from '../booking/BookingCalendar';
import PropertyDetails from '../PropertyDetails';
import UserInfo from '../UserInfo';
import Amenities from '../Amenities';
import Description from '../Description';
import { Separator } from '@/components/ui/separator';


async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = await fetchPropertyDetails(params.id);
    if (!property) redirect('/');
    const { baths, bedrooms, beds, guests } = property;
    const details = { baths, bedrooms, beds, guests };

    const firstName = property.profile.firstName;
    const profileImage = property.profile.profileImage;

    return <section>
        <BreadCrumbs name={property.name} />
        <header className='flex justify-between items-center mt-4'>
            <h1 className='text-4xl font-bold '>{property.tagline}</h1>
            <div className='flex items-center gap-x-4'>
                <ShareButton name={property.name} propertyId={property.id} />
                <FavoriteToggleButton propertyId={property.id} />
            </div>
        </header>
        <ImageContainer mainImage={property.image} name={property.name} />
        <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
            <div className='lg:col-span-8'>
                <div className='flex gap-x-4 items-center'>
                    <h1 className='text-xl font-bold'>{property.name}</h1>
                    <PropertyRating inPage propertyId={property.id} />
                </div>
                <PropertyDetails details={details} />
                <UserInfo profile={{ firstName, profileImage }} />
                <Separator className='mt-4' />
                <Description description={property.description} />
                <Amenities amenities={property.amenities} />
            </div>
            <div className='lg:col-span-4 flex flex-col items-center'>
                {/* calendar */}
                <BookingCalendar />
            </div>
        </section>

    </section>
}
export default PropertyDetailsPage;