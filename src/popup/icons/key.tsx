interface Props {
  title?: string;
  desc?: string;
}

export function KeyIcon({
  title,
  desc,
  ...props
}: Props & React.SVGAttributes<SVGSVGElement>) {
  const uuid = crypto.randomUUID().replace(/-/g, "");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="23"
      viewBox="0 0 12 23"
      fill="currentColor"
      aria-labelledby={`${uuid}_title ${uuid}_desc`}
      role="img"
      {...props}
    >
      <title id={`${uuid}_title`}>{title}</title>
      <desc id={`${uuid}_desc`}>{desc}</desc>
      <path d="M5.98632812,22.9248047 C6.13606771,22.9345703 6.26953125,22.8808594 6.38671875,22.7636719 L9.296875,19.8535156 C9.4140625,19.7298177 9.47265625,19.593099 9.47265625,19.4433594 C9.47265625,19.2936198 9.4140625,19.1634115 9.296875,19.0527344 L7.56835938,17.3339844 L9.98046875,14.921875 C10.0846354,14.8177083 10.1367188,14.6907552 10.1367188,14.5410156 C10.1367188,14.391276 10.0748698,14.2545573 9.95117188,14.1308594 L7.59765625,11.7578125 C8.99739583,11.1783854 10.0732422,10.3841146 10.8251953,9.375 C11.5771484,8.36588542 11.953125,7.22981771 11.953125,5.96679688 C11.953125,5.14648438 11.8001302,4.375 11.4941406,3.65234375 C11.188151,2.9296875 10.7617188,2.29492188 10.2148438,1.74804688 C9.66796875,1.20117188 9.03320312,0.773111979 8.31054688,0.463867188 C7.58789062,0.154622396 6.80989583,0 5.9765625,0 C5.14322917,0 4.36523438,0.154622396 3.64257813,0.463867188 C2.91992188,0.773111979 2.28515625,1.20117188 1.73828125,1.74804688 C1.19140625,2.29492188 0.764973958,2.9280599 0.458984375,3.64746094 C0.152994792,4.36686198 0,5.13997396 0,5.96679688 C0,6.79361979 0.154622396,7.57486979 0.463867188,8.31054688 C0.773111979,9.04622396 1.2109375,9.69238281 1.77734375,10.2490234 C2.34375,10.8056641 3.01106771,11.233724 3.77929688,11.5332031 L3.77929688,20.5664063 C3.77929688,20.6901042 3.80045573,20.8056641 3.84277344,20.9130859 C3.88509115,21.0205078 3.95507812,21.1230469 4.05273438,21.2207031 L5.625,22.7734375 C5.71614583,22.8645833 5.83658854,22.9150391 5.98632812,22.9248047 Z M5.9765625,5.625 C5.53385417,5.625 5.15136719,5.4671224 4.82910156,5.15136719 C4.50683594,4.83561198 4.34570312,4.44986979 4.34570312,3.99414062 C4.34570312,3.54492188 4.50520833,3.16080729 4.82421875,2.84179688 C5.14322917,2.52278646 5.52734375,2.36328125 5.9765625,2.36328125 C6.43229167,2.36328125 6.81966146,2.52441406 7.13867188,2.84667969 C7.45768229,3.16894531 7.6171875,3.55143229 7.6171875,3.99414062 C7.6171875,4.44986979 7.45768229,4.83561198 7.13867188,5.15136719 C6.81966146,5.4671224 6.43229167,5.625 5.9765625,5.625 Z" />
    </svg>
  );
}
