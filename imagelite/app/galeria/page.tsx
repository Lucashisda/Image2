'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, ImageCard, Template } from '@/components';
import { Image } from '@/resource/image';
import { useImageService } from '@/resource/service';

export default function Galeria() {
  const router = useRouter();
  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [extension, setExtension] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  async function searchImages() {
    setIsLoading(true);

    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
    } finally {
      setIsLoading(false);
    }
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard
        key={image.url}
        imageName={image.name}
        imageUrl={image.url}
        imageSize={image.size}
        uploadDate={image.uploadDate}
        extension={image.extension}
      />
    );
  }

  function renderImageCards() {
    return images.map(renderImageCard);
  }

  return (
    <Template>
      <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Biblioteca</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Minhas imagens</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-[220px] rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-900/50"
              placeholder="Buscar imagens..."
            />
            <select
              onChange={(event) => setExtension(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-900/50"
            >
              <option value="">Todos os formatos</option>
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="JPEG">JPEG</option>
              <option value="GIF">GIF</option>
            </select>
            <Button type="button" onClick={searchImages}>
              Search
            </Button>
            <Button type="button" variant="danger" onClick={() => router.push('/upload')}>
              Add New
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-10 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
            <p className="text-lg font-semibold text-slate-200">Buscando imagens...</p>
          </div>
        </section>
      ) : images.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-200">Nenhuma imagem encontrada.</p>
          <p className="mt-2 text-sm text-slate-400">Faça uma busca ou envie uma nova imagem.</p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderImageCards()}
        </section>
      )}
    </Template>
  );
}