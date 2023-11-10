import Cards from "./Cards";
import PropTypes from 'prop-types'

export default function Filter({ spots }) {

  return (
    <div className="bg-white">
      <div className="h-fit flex flex-col">
        <main className="mx-auto max-w-full px-1 sm:px-6 lg:w-screen lg:px-32">
          <section
            aria-labelledby="products-heading"
            className="pt-6 pb-6 ml-0"
          >
            {/* Product grid */}
            <div className="lg:col-span-3 flex flex-col gap-12">
              {/* Your content */}
              {spots.map((item, index) => {
                console.log(item);
                return <Cards key={index} {...item} />;
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

Filter.propTypes = {
  spots: PropTypes.array
}
