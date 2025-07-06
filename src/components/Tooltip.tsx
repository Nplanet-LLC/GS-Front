"use client";

import React, { useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  shift,
  flip,
  arrow,
  FloatingArrow,
  useDismiss,
  FloatingPortal,
} from "@floating-ui/react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
  maxWidth?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = "",
  placement = "top",
  maxWidth = 400,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(12),
      shift({ padding: 10 }),
      flip({ padding: 10 }),
      arrow({ element: arrowRef }),
    ],
    placement,
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 300, close: 100 },
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className="z-[9999] px-5 py-4 text-white bg-gray-900 rounded-xl shadow-2xl border-gray-700 border tooltip-animate"
            style={{
              ...floatingStyles,
              maxWidth: `${maxWidth}px`,
              minWidth: "250px",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
              fontSize: "14px",
            }}
          >
            {content}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className="fill-gray-900"
              width={20}
              height={10}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
