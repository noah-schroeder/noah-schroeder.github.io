def update_scholar_stats():
  try:
      author = scholarly.search_author_id('W-Ij6voAAAAJ')
      author = scholarly.fill(author)
      
      stats = {
          'citations': author['citedby'],
          'h_index': author['hindex'],
          'publications': len(author['publications']),
          'last_updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
          'recent_publications': []
      }
      
      publications = author['publications']
      publications.sort(key=lambda x: int(x['bib'].get('pub_year', '0')), reverse=True)
      
      for i, pub in enumerate(publications[:3]):
          filled_pub = scholarly.fill(pub)
          
          # Debug print to see what data we're getting
          print(f"\nRaw publication data:")
          print(filled_pub['bib'])
          
          pub_data = {
              'title': filled_pub['bib']['title'],
              'year': filled_pub['bib'].get('pub_year', 'Year Unknown'),
              'citation': filled_pub['bib'].get('citation', 'Citation not available'),
              'abstract': filled_pub['bib'].get('abstract', 'Abstract not available'),
              'url': filled_pub.get('pub_url', '#'),
              'authors': filled_pub['bib'].get('author', [])
          }
          stats['recent_publications'].append(pub_data)
          
          print(f"\nProcessed publication:")
          print(f"Title: {pub_data['title']}")
          print(f"Year: {pub_data['year']}")
          print(f"Citation: {pub_data['citation']}")
          print(f"Abstract: {pub_data['abstract'][:100]}...")
          print("---")
          
      os.makedirs('assets/data', exist_ok=True)
      json_path = os.path.join(os.getcwd(), 'assets/data/scholar_stats.json')
      with open(json_path, 'w', encoding='utf-8') as f:
          json.dump(stats, f, ensure_ascii=False, indent=2)
          
      print("Successfully updated scholar stats and publications")
      print(f"JSON file saved to: {json_path}")
      
  except Exception as e:
      print(f"Error updating scholar stats: {str(e)}")
      raise e