const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex">


        
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
