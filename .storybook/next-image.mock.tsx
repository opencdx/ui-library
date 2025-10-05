import * as React from 'react';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean };

// Minimal mock for next/image so stories render in non-Next environments.
// Simply forwards to a standard <img />.
const NextImage: React.FC<ImgProps> = ({ fill: _fill, style, ...props }) => {
  return <img {...props} style={style} />;
};

export default NextImage;
export const Image = NextImage;

