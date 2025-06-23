type LayoutProps = {
  children: React.ReactNode;
};

const Wrapper = ({children}: LayoutProps) => {
    return(
        <div className="w-full h-full px-15">
            {children}
        </div>
    )
}
export default Wrapper
