'use client';

interface ImageCardProps {
  imageUrl?: string;
  imageName?: string;
  imageSize?: number;
  uploadDate?: string;
  extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageName, imageUrl, imageSize, uploadDate, extension }) => {
  function downloadImage() {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20">
      <div className="overflow-hidden">
        <img
          onClick={downloadImage}
          src={imageUrl}
          className="h-56 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
          alt={imageName ?? 'Imagem'}
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-lg font-semibold text-slate-100">{imageName ?? 'Imagem sem nome'}</h2>
          <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-300">
            {extension ?? 'IMG'}
          </span>
        </div>

        <div className="space-y-1 text-sm text-slate-400">
          <p>{formatBytes(imageSize ?? 0)}</p>
          <p>{uploadDate ?? 'Sem data'}</p>
        </div>
      </div>
    </div>
  );
};

function formatBytes(bytes: number = 0, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const absBytes = Math.abs(bytes);
  const i = Math.min(Math.floor(Math.log(absBytes) / Math.log(k)), sizes.length - 1);
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedValue} ${sizes[i]}`;
}
