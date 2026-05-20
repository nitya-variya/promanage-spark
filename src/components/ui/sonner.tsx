import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      expand={true}
      richColors
      closeButton
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            backdrop-blur-md
            bg-black/70
            border border-white/10
            text-white
            shadow-[0_8px_30px_rgb(0,0,0,0.35)]
            rounded-2xl
            px-5 py-4
            gap-3
            overflow-hidden
            before:absolute
            before:inset-0
            before:bg-gradient-to-br
            before:from-white/[0.08]
            before:to-transparent
            before:pointer-events-none
          `,

          title: `
            text-[15px]
            font-semibold
            tracking-[-0.02em]
            text-white
          `,

          description: `
            text-sm
            text-white/60
            leading-relaxed
          `,

          actionButton: `
            bg-white
            text-black
            hover:bg-white/90
            rounded-xl
            px-4
            py-2
            text-xs
            font-medium
            transition-all
          `,

          cancelButton: `
            bg-white/10
            backdrop-blur-sm
            border border-white/10
            text-white/70
            hover:bg-white/20
            rounded-xl
            px-4
            py-2
            text-xs
            transition-all
          `,

          success: `
            border border-emerald-500/20
          `,

          error: `
            border border-red-500/20
          `,

          warning: `
            border border-yellow-500/20
          `,

          info: `
            border border-blue-500/20
          `,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
