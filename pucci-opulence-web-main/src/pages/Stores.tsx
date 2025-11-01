const Stores = () => {
  const stores = [
    {
      name: 'Pucci Avenues',
      address: 'Nungambakkam, 3rd Street',
      city: 'Chennai'
    },
    {
      name: 'Pucci Phoenix',
      address: '2nd Floor, Phoenix Marketcity, Velachery',
      city: 'Chennai'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="font-serif text-5xl mb-16 tracking-wider">Store Locations</h1>
        
        <div className="space-y-12">
          {stores.map((store, idx) => (
            <div key={idx} className="border-b border-border pb-12">
              <h2 className="font-serif text-3xl mb-4 tracking-wide">{store.name}</h2>
              <p className="font-sans text-lg text-muted-foreground mb-2">{store.address}</p>
              <p className="font-sans text-lg text-muted-foreground">{store.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stores;
