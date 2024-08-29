interface ButtonProps {
    children: string;
  }
  
  export const Button = ({ children }: ButtonProps) => {
    return (
      <button className="group py-4 px-8 bg-[#f6fced] border-[1px] border-[#83E70C] rounded-xl font-semibold hover:bg-[#83E70C] transition-colors duration-500 delay-[0.1s] ease-[cubic-bezier(0.19,1,0.22,1)]">
        <div className="overflow-hidden relative">
          <p className="text-[#83E70C] group-hover:translate-y-[-20px] duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            {children}
          </p>
          <p
            aria-hidden
            className="absolute left-0 top-5 text-[#f6fced] group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
          >
            {children}
          </p>
        </div>
      </button>
    );
  };
  