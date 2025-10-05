export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">About Recipe Finder</h1>
          <p className="text-gray-700 text-lg mb-6">
            Recipe Finder is your go-to platform for discovering delicious meals from around the world.
            Whether you're searching by ingredient, craving something specific, or just exploring, we've got you covered.
          </p>
          <p className="text-gray-600 mb-6">
            Built with love and a passion for good food, this app brings together curated recipes, smart search tools,
            and a clean design to make your cooking journey delightful.
          </p>
          <p className="text-gray-600">
            We believe cooking should be joyful, accessible, and inspiring. That’s why we’ve built a platform that helps
            you find recipes that match your taste, time, and ingredients—without the clutter.
          </p>
        </div>
      </section>

      {/* Optional Values Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Our Values</h2>
          <p className="text-gray-600">
            Simplicity, flavor, and discovery. Whether you're a seasoned chef or just starting out, Recipe Finder is here
            to make your next meal memorable.
          </p>
        </div>
      </section>
    </div>
  );
}